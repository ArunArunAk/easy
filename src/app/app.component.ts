import { Component } from '@angular/core';
import { Firestore, collection, addDoc,collectionData, doc ,deleteDoc} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fire';
  userdata!:Observable<any>;
  array=[];

  constructor(public toastr: ToastrService,private firestore: Firestore) {//
    this.getData();
    console.log("userdata",this.userdata);

  }
  onSubmit(form: any) {
    console.log('Form submitted:', form.value);
  
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, form.value)
      .then(() => {
        form.reset();
        console.log('data saved successfully');
        this.toastr.success('Data added successfully!', 'Success');
        
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('Error adding data!', 'Error');
      });
  }
  getData(){
    const collectionInstance = collection(this.firestore, 'users');
     collectionData(collectionInstance,{ idField:'id'}).subscribe(val=>{
      console.log(val);
     })
     this.userdata=collectionData(collectionInstance,{ idField:'id'});
  }

  dletedata(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    deleteDoc(docInstance).then(() => {
      console.log('Delete successful');
      this.toastr.info('Data deleted successfully!', 'sucesss');
    }).catch((err) => {
      console.log(err);
      this.toastr.error('Error deleting data!', 'Error');
    });
  }

}


















