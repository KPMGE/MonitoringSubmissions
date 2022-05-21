import { ListStudentsService } from "../../../src/application/services/list-students"
import { makeStudent } from "../../domain/mocks"
import { ListStudentsRepositorySpy } from "../mocks"

type SutTypes = {
  repo: ListStudentsRepositorySpy
  sut: ListStudentsService
}

const makeSut = (): SutTypes => {
  const repo = new ListStudentsRepositorySpy()
  const sut = new ListStudentsService(repo)
  return {
    repo,
    sut
  }
}

describe('list students', () => {
  it('should call repository only once', () => {
    const { repo, sut } = makeSut()

    sut.list()

    expect(repo.callsCount).toBe(1)
  })

  it('should throw if repository throws', async () => {
    const { repo, sut } = makeSut()
    repo.list = () => { throw new Error() }

    const promise = sut.list()

    await expect(promise).rejects.toThrow()
  })

  it('should return a valid list of students', async () => {
    const { sut } = makeSut()

    const students = await sut.list()

    expect(students.length).toBe(1)
    expect(students[0]).toEqual(makeStudent())
  })
})
