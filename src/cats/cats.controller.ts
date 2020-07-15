import { Controller, Get, Post, Query,
    Body,HttpException,HttpStatus, Param,
    BadRequestException,NotFoundException,
    ParseUUIDPipe, Res,
    UseFilters, ForbiddenException, 
    ParseIntPipe, UseGuards} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import {  AllExceptionsFilter  } from './http-exception.filter';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from '../roles.decorator';
import { Response } from 'express';

@Controller('cats')
// @UseGuards(RolesGuard)
export class CatsController {
    constructor(private catsService: CatsService) {}

    // @Post()
    // async create(@Body() createCatDto: CreateCatDto) {
    //     this.catsService.create(createCatDto);
    //     return console.log("new cat created")
    // }

    @Post()
    @Roles('admin')
    async create(@Body() createCatDto: CreateCatDto,
        @Res() res: Response) {
            try {
                this.catsService.create(createCatDto);
                res.send("cat added")
                return console.log("new cat created")
            } catch (error) {
                throw new ForbiddenException();
            }
        
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
    // @Get()
    // async findAll(): Promise<Cat[]> {
    //     throw new HttpException({
    //         status: HttpStatus.FORBIDDEN,
    //         error: 'This is a custom message',
    //         }, //<-- 1er param obj
    //         HttpStatus.FORBIDDEN); //<-- 2eme param
    // }
    // @Get(':id')
    // async findOne(@Param('id', ParseIntPipe) id:number){
    //     try {
    //         if (this.catsService.findOne(id) != undefined){

    //             return this.catsService.findOne(id);
    //         }else{
    //             throw new NotFoundException();
    //         }
    //     }catch (error) {
    //         throw new NotFoundException();
    //     }
    // }
    
        
}
