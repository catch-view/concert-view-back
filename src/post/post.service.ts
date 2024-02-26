import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

import { Post } from './schemas/post.schema';
import { SuccessResponse } from 'src/common/interfaces/success.respnse';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private firebaseService: FirebaseService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<SuccessResponse> {
    try {
      const createdPost = new this.postModel(createPostDto);
      await createdPost.save();
      return {
        result: true,
        message: '게시물 등록이 완료되었습니다',
      };
    } catch (err) {
      return {
        result: false,
        message: '게시물 등록 중 오류가 발생했습니다',
      };
    }
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
