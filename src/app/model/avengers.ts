export class Avengers {
  public Id: number;
  public Name: string;
  public Gender: string;
  public Salary: number;
  public DOJ: string;
  constructor(
    id: number,
    name: string,
    gender: string,
    salary: number,
    doj: string
  ) {
      (this.Id = id),
      (this.Name = name),
      (this.Gender = gender),
      (this.Salary = salary),
      (this.DOJ = doj);
  }
}
