import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  profile1:File | null=null;
  receivedData: any;
  employeedata: any;
  public data:any;
  data1:any;
  bodydata:any;
  first:string="";
  last:string="";
  gender:string="";
  mobno?: number;
  address:string="";
  aadharno:string="";
  dob: string='';
  department:string="";
  designation:string="";
  selectedFile5: File | null = null;

  
  selectedFile: File | null = null;
  selectedFile1: File | null = null;
  selectedFile2: File | null = null;
  selectedFile3: File | null = null;
  selectedFile4: File | null = null;

  fileImageUrl: string | null = null;
  fileImageUrl1: string | null = null;
  fileImageUrl2: string | null = null;
  fileImageUrl3: string | null = null;
  fileImageUrl4: string | null =null;
  constructor(
    private http: HttpClient,
    private route:Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.data=localStorage.getItem('email');
    this.data1={
      'email':this.data,
    }
    console.log(this.data);
    this.http.post("http://127.0.0.1:8000/edit/",this.data1).subscribe(
      (res)=>{this.employeedata=res}
    )
  }

  uploadphoto(event: any){
     this.profile1= event.target.files[0];
  }

  displayFile(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.readFileAsDataURL(this.selectedFile)
        .then((dataUrl) => {
          this.fileImageUrl = dataUrl;
        })
        .catch((error) => {
          console.error('Error reading file:', error);
        });
    }
  }
  displayFile1(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile1 = fileInput.files[0];
      this.readFileAsDataURL(this.selectedFile1)
        .then((dataUrl) => {
          this.fileImageUrl1 = dataUrl;
        })
        .catch((error) => {
          console.error('Error reading file:', error);
        });
    }
  }
  displayFile2(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile2 = fileInput.files[0];
      this.readFileAsDataURL(this.selectedFile2)
        .then((dataUrl) => {
          this.fileImageUrl2 = dataUrl;
        })
        .catch((error) => {
          console.error('Error reading file:', error);
        });
    }
  }
  displayFile3(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile3 = fileInput.files[0];
      this.readFileAsDataURL(this.selectedFile3)
        .then((dataUrl) => {
          this.fileImageUrl3 = dataUrl;
        })
        .catch((error) => {
          console.error('Error reading file:', error);
        });
    }
  }
  displayFile4(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile4 = fileInput.files[0];
      this.readFileAsDataURL(this.selectedFile4)
        .then((dataUrl) => {
          this.fileImageUrl4 = dataUrl;
        })
        .catch((error) => {
          console.error('Error reading file:', error);
        });
    }
  }
 
  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
 
  downloadFile() {
    const fileUrl = 'assets/file/HR_POLICY_BARIFLOLABS(1).pdf'; // Replace with the actual file URL
    const fileName = 'HR POLICY'; // Replace with the desired file name

    this.http.get(fileUrl, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        saveAs(response, fileName);
      });
  }
  
  downloadFile1() {
    const fileUrl = 'assets/file/MUTUAL_NON-DISCLOSURE_AGREEMENT.pdf'; // Replace with the actual file URL
    const fileName = 'NDA'; // Replace with the desired file name

    this.http.get(fileUrl, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        saveAs(response, fileName);
      });
  }

  downloadFile2() {
    const fileUrl = 'assets/file/probationaries_and_employees.pdf'; // Replace with the actual file URL
    const fileName = 'ORGANISATIONAL POLICY'; // Replace with the desired file name

    this.http.get(fileUrl, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        saveAs(response, fileName);
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

 
  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // Replace 'your-upload-url' with the actual URL to handle the file upload on the server
      this.http.post('http://127.0.0.1:8000/', formData)
        .subscribe(
          (response) => {
            console.log('File uploaded successfully');
          },
          (error) => {
            console.error('File upload failed:', error);
          }
        );
    }
  }

  uploaddoc(){
    const formattedDate = this.datepipe.transform(this.dob, 'yyyy-MM-dd');
    let datatosend=new FormData();
    datatosend.append('FirstName',this.first);
    datatosend.append("LastName",this.last);
    datatosend.append("Gender",this.gender);
    datatosend.append("address",this.address);
    datatosend.append("Department",this.department);
    datatosend.append("Designation",this.designation);
    datatosend.append("AadharNumber",this.aadharno);
    if (this.mobno != undefined) {
      datatosend.append("Mobno", this.mobno.toString());
    }
    if(formattedDate != null){
        datatosend.append("DOB",formattedDate);
    }
    datatosend.append("ProfileImage",this.profile1 as Blob);
    datatosend.append("AadharImage",this.selectedFile as Blob);
    datatosend.append("DrivingLicense",this.selectedFile1 as Blob);
    datatosend.append("PanCard",this.selectedFile2 as Blob);
    datatosend.append("Marksheet",this.selectedFile3 as Blob);
    datatosend.append("AdressProof",this.selectedFile4 as Blob);
    console.log(datatosend);
    this.http.put(`http://127.0.0.1:8000/edit1/${this.data}`,datatosend).subscribe(
        (res)=>{console.log(res);
              this.route.navigate(['profile'])},
        (err)=>{console.log(err)}
  ) 
}
 
}
