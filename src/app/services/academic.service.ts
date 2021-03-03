import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {
  constructor(private http: HttpService) { }

  getTimeline(start, limit, field, key = '') {
    var data = {
      "search": [
        {
          "field": field,
          "key": key
        }
      ]
    }
    return this.http.post_academic("timeline/all?size=" + limit + "&sort=createTime&dir=-1&page=" + start, data);
  }

  getUser() {
    return this.http.get_academic_sso("auth/user_sso");
  }
  getComboClass() {
    return this.http.get_academic("kelas/all");
  }
  getComboJadwal() {
    return this.http.get_academic("combobox/jadwal");
  }
  getComboSesi(rppId) {
    return this.http.get_academic("combobox/sesi/" + rppId);
  }
  getComboYear() {
    return this.http.get_academic("combobox/year");
  }
  getComboSemester() {
    return this.http.get_academic("combobox/semester");
  }

  getClassById(id) {
    return this.http.get_academic("kelas/" + id);
  }
  getCommentByTimelineId(id) {
    return this.http.get_academic("timeline/comments/all/" + id);
  }

  getPreview(url) {
    return this.http.getPreview('www.facebook.com');
  }



  getClassByClassroomId(id) {
    var data = {
      "search": [
        {
          "field": "",
          "key": ""
        }
      ]
    }

    return this.http.post_academic("pelajar/kelas/" + id, data);
  }
  getAllClass() {
    return this.http.get_academic("kelas/all");
  }

  getTugasByTimelineId(id, detailid) {
    return this.http.get_academic("kbm/tugas/" + id + "/" + detailid);
  }
  AddAnswerByTimelineId(id, detailid, fileUrl, jawaban) {
    var data = {
      "fileUrl": fileUrl,
      "jawaban": jawaban
    }
    return this.http.post_academic("kbm/tugas/" + id + "/" + detailid, data);
  }


  addComment(id, message) {
    var data = {
      "comment": message
    }
    return this.http.post_academic("timeline/comments/" + id, data);
  }

  addStudent(data) {

    return this.http.post_academic("pelajar", data);
  }

  addClass(tahun, semester, kelas, namaKelas, tempclass) {
    var data = {
      "tahunAjaran": tahun,
      "semester": semester,
      "kelas": kelas,
      "namaKelas": namaKelas,
      "temp": tempclass
    }
    return this.http.post_academic("kelas", data);
  }
  getMedia(start, limit) {
    var data = {
      "search": [
        {
          "field": "",
          "key": ""
        }
      ]
    }
    return this.http.post_academic("media/all?size=" + limit + "&sort=createTime&dir=-1&page=" + start, data);
  }


  addUjian(data) {
    return this.http.post_academic("kbm/ujian", data);
  }
  addLatihan(data) {
    return this.http.post_academic("kbm/latihan", data);
  }


  login(username, password) {

    const formData = new FormData();

    formData.append('password', password)
    formData.append('username', username)

    return this.http.login_academic(formData);
  }

  addInfo(title, desc, tags, file, status: true) {
    var data = {
      "title": title,
      "description": desc,
      "tags": tags,
      "attachments": file,
      "status": status
    }

    return this.http.post_academic("kbm/info", data);
  }

  addMateri(res: any) {
    var data = {
      "rppId": res.rppId,
      "rencanaKbmId": res.rencanaKbmId,
      "judul": res.judul,
      "keterangan": res.keterangan,
      "materi": res.materi,
      "attachments": res.attachments,
      "link": res.link,
      "status": res.status
    }

    return this.http.post_academic("kbm/materi", data);
  }

  addTugas(res: any) {
    var data = {
      "rppId": res.rppId,
      "rencanaKbmId": res.rencanaKbmId,
      "judul": res.judul,
      "keterangan": res.keterangan,
      "attachments": res.attachments,
      "tanggalPengumpulan": res.tanggalPengumpulan,
      "status": res.status
    }

    return this.http.post_academic("kbm/tugas", data);
  }

  getHighlight() {
    return this.http.get_academic('hightlight');
  }
  getExam(id) {
    return this.http.get_academic('kbm/ujian/mulai/' + id)
  }

  postUjian(data, id) {
    return this.http.post_academic('kbm/ujian/hasil/' + id, data)
  }
  getPractice(id) {
    return this.http.get_academic('kbm/latihan/mulai/' + id)
  }

  postPractice(data, id) {
    return this.http.post_academic('kbm/latihan/hasil/' + id, data)
  }

}
