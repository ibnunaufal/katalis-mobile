import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  constructor(private http: HttpService) {}

  getStudent() {
    return this.http.get("katalis/academic/student/child");
  }
}
