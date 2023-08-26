import{Req,Body,Controller,Get,Post,Param,ParseIntPipe,ValidationPipe,UsePipes,Session,Delete,Put} from "@nestjs/common";
import {registration_Dto} from "src/admin/registration.dto";
import * as session from 'express-session';
import {AdminService} from 'src/admin/admin.service';
import{login_Dto} from 'src/admin/login.dto';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import {deleteuser_Dto} from 'src/admin/deleteuser.dto';
import {approve_Dto} from 'src/admin/approve_member.dto';
import { changePassword_Dto } from "./changePassword.dto";
import { UserEntity } from "./admin.eneity";

@Controller('admin')
export class AdminController {
	constructor(private adminservice:AdminService){}

  //*********Registration_request***************************** */
	@Post('/registration')
  @UsePipes(new ValidationPipe())
  async registrationuser(
    @Body() registrationdto: {
      name: string;
      password: string;
      email: string;
      nid: number;
      // phone: string;
      address: string;
      status: string;
    }
  ) {
    const user= await this.adminservice.registrationuser(registrationdto);
    if(user==="User exist"){
      return { message: 'user exist' };
    }else if(user==="User added Successfull"){
      return { message: 'Success'};
    }
  }


  //*********Log_in******************************************** */
  @Post('login')
  async login(@Body() loginData: { name: string; password: string }) {
    const user = await this.adminservice.login(loginData.name);

    if (!user) {
      return { message: 'User not found' }; 
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

    if (isPasswordValid) {
      // Generate and return a JWT token or perform login actions here
      return { message: 'Login successful' };
    } else {
      throw new Error('Invalid name or password');
    }
  }

  
  //see user profile..............
  @Get('/seeuserprofile/:name')
  async findOneByName(@Param('name') name: string) {
    return this.adminservice.findOneByName(name);
  }

  //see approve request ..............
  @Get('/unapproved')
  async getUnapprovedUsers() {
    const unapprovedUsers = await this.adminservice.getUnapprovedUsers();
    return unapprovedUsers;
  }


///Approved new member................

@Put('/aproved_new_member/:name')
  @UsePipes(new ValidationPipe())
  async approvedNewMember( @Param('name') name: string) {
  
        const response = await this.adminservice.approvedNewMember(name);
        return response;
  }

  // see customer's list................
  @Get('/customer_list')
  async customerList(){
    const show ="customer";
      const response = await this.adminservice.customerList(show);
      return response;
  }

  // see seller's list................
  @Post('/seller_list')
  async sellerList(@Session() session: Record<string, any>){
    const show ="seller";
    if(session.status==='admin'){
      const response = await this.adminservice.sellerList(show);
      return response;
     }else{
      return "You are not an Admin!!";
     }
  }

  // see customer oderlist.........
  @Post('/show_order_list/:username')
   async orderList(@Param('username') name: string): Promise<any> {
      const user = await this.adminservice.orderList(name);
      return user; 
   }

   // search Product list by seller's name.........
  @Get('/Product_list/:username')
  async productList(@Param('username') name: string, @Session() session: Record<string, any>): Promise<any> {
   if(session.status=="admin"){
     const user = await this.adminservice.productList(name);
     return user;
   } else{
     return "You are not an Admin";
   }
    
  }

  //search user by username.........
  @Get('/showregisterduser/:username')
  async getUsers(@Param('username') name: string, @Session() session: Record<string, any>): Promise<any> {
    if(session.status=="admin"){
      const user = await this.adminservice.getUsers(name);
      session.username=user.name;
      return user;
    }else{
      return "You are no an Admin!";
    }
    
  }

//************************Delete User */
@Delete("/delete")
  @UsePipes(new ValidationPipe())
  async deleteUser(@Body() delete_dto:deleteuser_Dto,@Session() session: Record<string, any> ):Promise<any>{
    if(session.status=="admin"){
      return await this.adminservice.deleteUser(delete_dto);
    }else{
      return "You are not Admin!";
    }

  }

//**********************Delete User************ */

@Put('/update-profile/:name')
  @UsePipes(new ValidationPipe())
  async updateProfile(@Body() updateProfileDto: {
    name: string;
    password: string;
    email: string;
    nid: number;
    address: string;
    status: string;
  } ,@Param('name') name: string): Promise <any> {
    const response = await this.adminservice.updateProfile(updateProfileDto, name);
    if (response === 'update_success') {
      return { message: 'update_success' };
    } else if (response === 'username_not_matched') {
      return { message: "username_not_matched" };
    }else if(!response){
      return {message :"not_update"};
    }
  }
  

  //**************************Blocked user********** */

@Get('/blocked_user/:username')
  async blockeUser(@Param('username') name: string, @Session() session: Record<string, any>): Promise<any> {
    if(session.status=="admin"){
      const user = await this.adminservice.blockeUser(name);
      return user;
    }else{
      return "You are no an Admin!";
    }
    
  }

  @Post('logout')
  logout(@Req() req: Request & { session: any }) {
  req.session.destroy();
  return 'Logout successful!';
}

// @Put('/Chnage_password')
//   @UsePipes(new ValidationPipe())
//   async changePassword(@Body()changePassword_dto: changePassword_Dto,@Session() session: Record<string, any> ): Promise<string> {
//     if(session.status=="admin"){
//       const response = await this.adminservice.changePassword(changePassword_dto,session.name);
//       return response;
//     } else{
//       return "You are not Admin!";
//     }
//   }

  }

