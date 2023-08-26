import { Injectable ,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './admin.eneity';
import { registration_Dto } from './registration.dto';
import { login_Dto } from './login.dto';
import * as bcrypt from 'bcrypt';
import { deleteuser_Dto } from './deleteuser.dto';
import {approve_Dto} from 'src/admin/approve_member.dto';
import { CustomerEntity } from './customer.entity';
import {SellerEntity} from "src/admin/seller.entity";
//import { MailerService } from '@nestjs-modules/mailer';
import{changePassword_Dto} from "src/admin/changePassword.dto";


@Injectable()
export class AdminService{
    constructor(
        @InjectRepository(UserEntity)
        private userRepo:
        Repository<UserEntity>,
        @InjectRepository(CustomerEntity)
        private customerRepo:
        Repository<CustomerEntity>,
        @InjectRepository(SellerEntity)
        private sellerRepo:
        Repository<SellerEntity>){}
        
        //registration user....
        async registrationuser(registration_dtoo: any) {
          const User = await this.userRepo.findOne({ where: { name: registration_dtoo.name } });
      
          if (User) {
            
            return 'User exist';
          } else {

            const newUser = new UserEntity();
            newUser.name = registration_dtoo.name;
            newUser.password = registration_dtoo.password; 
            newUser.email = registration_dtoo.email;
            newUser.nid = registration_dtoo.nid;
            // newUser.phone = registration_dtoo.phone;
            newUser.address = registration_dtoo.address;
            newUser.status = registration_dtoo.status;
            newUser.approval = "null";

            const hashedPassword = await bcrypt.hash(registration_dtoo.password, 10);
            newUser.password = hashedPassword;

           const savedUser = await this.userRepo.save(newUser);

           return "User added Successfull";
          }
        }

      //login.....
      async login(name: string): Promise<UserEntity | null> {
        return this.userRepo.findOne({ where: { name } });
      }
      ///see profile................
      async findOneByName(name: string) {
        return this.userRepo.findOneBy({ name });
      }

      ///see unapproved member................
      async getUnapprovedUsers(): Promise<UserEntity[]> {
        const unapprovedUsers = await this.userRepo.find({ where: { approval: "null" } });
        return unapprovedUsers;
      }
      //*************Approved new member************* */
      async approvedNewMember( name: string): Promise<string> {
        const regUser = await this.userRepo.findOne({ where: { name } });
    
        if (!regUser) {
          return ('User_not_found');
        }
    
        regUser.approval = "approved";
    
        try {
          await this.userRepo.createQueryBuilder()
            .update(UserEntity)
            .set({ approval: regUser.approval })
            .where('name = :name', { name })
            .execute();
    
          return ('Approved_success');
        }catch (error) {
          throw new Error('User Not Found.');
        }
      }
    ///******************show customer List************* */
    async customerList(show:string):Promise<any>{
      const users = await this.userRepo.find({ where: { status: show } });
      return users;
    }

     ///******************show Seller List************* */
     async sellerList(show:string):Promise<any>{
      const users = await this.userRepo.find({ where: { status: show } });
      if (users !== null) {
        const sellers: UserEntity[] = [];
    
        for (const user of users) {
          if (user.approval !== null && user.approval !=="Blocked") {
            const seller = new UserEntity();
            seller.name = user.name;
            seller.email = user.email;
            seller.nid = user.nid;
            // seller.phone = user.phone;
            seller.address = user.address;
            seller.status = user.status;
    
            sellers.push(seller);
          }
        }
    
        return sellers;
      }
    
      return [];
    
    }

//*************see customer order list............*/

async orderList(name: string): Promise<any> {
  const orderList = await this.customerRepo.find({ where: { name: name } });
  if(!orderList){
     return ("Customer has no oder list");
  }
  return orderList;

}

//*************search customer order list............*/

async productList(name: string): Promise<any> {
  const productList = await this.sellerRepo.find({ where: { name: name } });
  const products: SellerEntity[] = [];
    
  for (const productsinfo of productList) {
    
    const product = new SellerEntity();
    product.product_id=productsinfo.product_id;
    product.name = productsinfo.name;
    product.product_name = productsinfo.product_name;
    product.product_description = productsinfo.product_description;
    product.price = productsinfo.price;

    products.push(product); 
}
return products;

}

///search user by session.....
async getUsers(name: string): Promise<any> {
  const user = await this.userRepo.findOne({ where: { name: name } });

  if (user) {
    if(user.status==="seller" || user.status==="customer"){

    const newUser = new UserEntity();
      newUser.name = user.name;
      newUser.email = user.email;
      newUser.nid = user.nid;
      // newUser.phone = user.phone;
      newUser.address = user.address;
      return newUser;
    }else{
      return "User not found!";
    }
  } else {
    return "User not Found";
  }
}

    //delete user............
    async deleteUser(delete_dtoo: deleteuser_Dto): Promise<any> {
      const user = await this.userRepo.findOne({ where: { name: delete_dtoo.name } });
    
      if (!user) {
        return 'User not exists!';
      } else {
        await this.userRepo.delete({ name: delete_dtoo.name });
        return 'User deleted successfully!';
      }
    }

      //update user profile by admin.....
      async updateProfile(updateProfileDto: any, name: string): Promise<string> {
        const regUser = await this.userRepo.findOne({ where: { name } });
      
        if (!regUser) {
          return 'user_not_found';
        }
      
        if (updateProfileDto.name === regUser.name) {
          const hashedPassword = await bcrypt.hash(updateProfileDto.password, 10);
          regUser.name = updateProfileDto.name;
          regUser.email = updateProfileDto.email;
          regUser.nid = updateProfileDto.nid;
          regUser.address = updateProfileDto.address;
          regUser.status = updateProfileDto.status;
          regUser.password = hashedPassword; // Set the hashed password
          await this.userRepo.update({ name }, regUser);
          return 'update_success';
        } else {
          return 'username_not_matched';
        }
      }
      
      

    //*********************Blocked User************* */
    async blockeUser(name: string): Promise<any> {
      const user = await this.userRepo.findOne({ where: { name: name } });
    
      if (!user) {
        return 'User not exists!';
      } else if(user.status!=="admin") {
        user.approval = "Blocked";
    
        try {
          await this.userRepo.createQueryBuilder()
            .update(UserEntity)
            .set({ approval: user.approval })
            .where('name = :name', { name })
            .execute();
    
          return 'User Blocked!';
        
      }catch(error){
        return "User Not Blocked!";
      }
    }else{
      return "Admin Blocked is not possible!";
    }
}

// async changePassword(changePassword_Dto: changePassword_Dto, name: string): Promise<string> {
//   const regUser = await this.userRepo.findOne({ where: { name } });

//   if (!regUser) {
//     throw new NotFoundException('User not found in the database.');
//   }
//   else if(changePassword_Dto.oldpassword===changePassword_Dto.oldpassword){
//   regUser.name = regUser.name;
//   regUser.password = updateProfileDto.password;
//   regUser.email = updateProfileDto.email;
//   regUser.nid = updateProfileDto.nid;
//   regUser.phone = updateProfileDto.phone;
//   regUser.address = updateProfileDto.address;
//   regUser.status=regUser.status;

//   try {
    
//       const up = await this.userRepo.update({ name }, regUser);
//       return "User Update successfully!";
    
    
//   } catch (error) {
//     throw new Error('User Not Found.');
//   }
// }else{
//   return "Name & Status Can not be changed!";
// }
//}
}