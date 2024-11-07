import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';

import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  private students: Student[] = [];
  private maxId = 0;

  private findIndexIfExists(id: number): number {
    const idx = this.students.findIndex((student) => student.id === id);
    if (idx === -1) throw new NotFoundException('No student with given id');
    return idx;
  }

  create(createStudentDto: CreateStudentDto) {
    this.maxId++;
    const newStudent: Student = { id: this.maxId, ...createStudentDto };
    this.students.push(newStudent);
    return newStudent;
  }

  findAll(): Student[] {
    return this.students;
  }

  findOne(id: number): Student {
    const idx = this.findIndexIfExists(id);
    return this.students[idx];
  }

  update(id: number, updateStudentDto: Partial<CreateStudentDto>): Student {
    const idx = this.findIndexIfExists(id);
    this.students[idx] = { ...this.students[idx], ...updateStudentDto };
    return this.students[idx];
  }

  remove(id: number) {
    const idx = this.findIndexIfExists(id);
    this.students.splice(idx, 1);
  }

  onModuleInit() {
    this.students.push({
      id: ++this.maxId,
      index: 32480,
      firstName: 'Łukasz',
      lastName: 'Kąśliwy',
    });
    this.students.push({
      id: ++this.maxId,
      index: 32481,
      firstName: 'Marek',
      lastName: 'Nowak',
    });
    this.students.push({
      id: ++this.maxId,
      index: 32482,
      firstName: 'Zenon',
      lastName: 'Zawada',
    });
  }
}
