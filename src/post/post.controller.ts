import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  CreatePostDto,
  UpdatePostDto,
  GetPostsDto,
  GetPostsResponse,
} from './dtos';
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
    console.log(createPostDto);
    return await this.postService.create(createPostDto);
  }

  /**
   * postID에 해당하는 post 전부 조회
   * @returns
   */
  @Get('/:placeID/:page')
  findAll(@Param() params: GetPostsDto) {
    return this.postService.findAll(params);
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
