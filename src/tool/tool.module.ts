import { Module } from '@nestjs/common';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';
import { Tool, ToolSchema } from './tool.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Tool.name, schema: ToolSchema }])],
  controllers: [ToolController],
  providers: [ToolService],
  exports: [ToolService]
})
export class ToolModule {}
