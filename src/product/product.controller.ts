import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { ProductService } from './product.service';
import { ProductDto } from 'src/dto/product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorstor';



@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Product')
@ApiBearerAuth('access-token')
@Controller('product')
export class ProductController {
    constructor(
        private readonly product: ProductService
    ) {}


    @Post('create_product')
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This API create a product'
    })
    async create_product(
        @Body() dto: ProductDto,
        @Body('product_img') base64_image: string
    ) {
        try {
            return this.product.create_product(dto, base64_image);
        } catch (error) {
            throw new BadRequestException(`Error creating product ${error.message}`);
        }
    }


    @Put('update_product/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This API updates a product'
    })
    async update_product(
        @Param('id') id: string,
        @Body() dto: ProductDto,
        @Body('product_img') base64_image: string
    ) {
        try {
            return this.product.update_product(dto, id, base64_image);
        } catch (error) {
            throw new BadRequestException(`Error updating product ${error.message}`);
        }
    }


    @Delete('delete_product/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This api allows the admin user to delete an existing product'
    })
    async delete_product(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.product.delete_product(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting product ${error.message}`);
        }
    }


    @Get('get_product/:id')
    @Roles(Role.ADMIN, Role.USER)
    @ApiOperation({
        summary: 'This api gets an existing product by id'
    })
    async get_product(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.product.get_product_by_id(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving product details: ${error.message}`);
        }
    }

    @Get('get_products')
    @Roles(Role.ADMIN, Role.USER)
    @ApiOperation({
        summary: 'Get products by category ID',
    })

    async getProductsByCategory() {
        try {
            return await this.product.get_product_by_category();
        } catch (error) {
            throw new BadRequestException(`Error retrieving products: ${error.message}`);
        }
    }
}
