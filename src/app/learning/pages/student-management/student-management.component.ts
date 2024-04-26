import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Student} from "../../model/student.entity";
import {MatTableDataSource} from "@angular/material/table";
import {StudentsService} from "../../services/students.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent implements OnInit, AfterViewInit{

  // Attributes
  studentData: Student;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'age', 'address', 'actions'];
  @ViewChild(MatSort, {static: false}) sort!: MatSort; // Sort
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor(private studentService: StudentsService) {
    this.studentData = {} as Student;
    this.dataSource = new MatTableDataSource<any>();
  }

  private getAllStudents(){
    this.studentService.getAll().subscribe((response: any)=>{
      this.dataSource.data = response;
    });
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // CRUD Actions
  private deleteStudent(studentId: number){
      this.studentService.delete(studentId).subscribe(()=>{
        this.dataSource.data = this.dataSource.data.filter((student: Student)=>{
          return student.id !== studentId ? student : false;
        });
      });
  }

  private updateStudent(){
    let studentToUpdate: Student = this.studentData;
    this.studentService.update(this.studentData.id, studentToUpdate)
      .subscribe((response: any)=>{
        this.dataSource.data = this.dataSource.data.map((student: Student)=>{
          if (student.id !== response.id){
            return response;
          }
          return student;
        });
      });
  }

  // UI Event Handlers

  onDeleteItem(element: Student){
    this.deleteStudent(element.id)
  }

  onStudentUpdate(element: Student){
    this.studentData = element;
    this.updateStudent();
  }

}




