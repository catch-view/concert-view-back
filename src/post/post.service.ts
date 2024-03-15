import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

import { Post } from './schemas/post.schema';
import { SuccessResponse } from 'src/common/interfaces/success.response';
import { GetPostsResponse } from './dtos/get-posts.response';
import { GET_POSTS_LIMIT } from './variables';
import { GetPostsDto } from './dtos/get-posts.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private firebaseService: FirebaseService,
  ) {}

  private readonly logger = new Logger(PostService.name);

  /**
   * @description firebase storage 이미지 정리 크론
   */

  @Cron('* * * * * *')
  async handleCron() {
    // 주기적으로 수행할 작업 등록
    // 추후 storage garbage 이미지 정리 작업 등록 예정
    const postImgsDoc = await this.postModel.find().exec();
    let postImages = [];
    postImgsDoc.forEach((item) => postImages.push(...item.images));
    postImages = postImages.map((img: string) => {
      const regexPatter = /image%2F(\d+)/;
      const match = img.match(regexPatter);
      return match[1];
    });
    const bucketImages = await this.firebaseService.getAllPostImages();

    const imgsToClean = [];
  }

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

  async findAll(getPostsDto: GetPostsDto) {
    const totalCount = await this.postModel.countDocuments();
    const isLastPage = getPostsDto.page * GET_POSTS_LIMIT >= totalCount;
    const nextPage = isLastPage ? undefined : getPostsDto.page + 1;
    const SKIP_NUM = (Number(getPostsDto.page) - 1) * GET_POSTS_LIMIT;
    const posts = await this.postModel
      .find({ placeID: getPostsDto.placeID })
      .skip(SKIP_NUM)
      .limit(GET_POSTS_LIMIT)
      .exec();
    const items = posts.map((post) => ({
      postID: post._id,
      placeID: post.placeID,
      author: post.author,
      tags: post.tags,
      images: post.images,
      title: post.title,
      html: post.html,
      createdAt: post.createdAt,
    }));
    return {
      items: items,
      totalCount: totalCount,
      currentPage: getPostsDto.page,
      nextPage,
      isLastPage: isLastPage,
    };
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
