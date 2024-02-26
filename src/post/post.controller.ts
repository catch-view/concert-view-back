import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * 게시글 등록 메서드
   * @param createPostDto
   * @returns
   */
  @Post('create')
  async create(@Body() createPostDto: CreatePostDto) {
    const res = await this.postService.create(createPostDto);
    console.log(res, 'TEST');
    return res;
  }

  @Get('/test')
  findAll() {
    console.log('test');
    return {
      msg: 'no',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
