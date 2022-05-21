import { ListStudentsRepository } from "../../../src/application/protocols"
import { Student } from "../../../src/domain/entities"
import { makeStudent } from "../../domain/mocks"

export class ListStudentsRepositorySpy implements ListStudentsRepository {
  callsCount = 0
  students = [makeStudent()]

  async list(): Promise<Student[]> {
    this.callsCount++
    return this.students
  }
}
