import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../models';

@Component({
  selector: 'app-member',
  standalone: false,
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit {
  fb = inject(FormBuilder);

  form!: FormGroup;

  hobbies: FormArray = this.fb.array([])

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control<string>('', Validators.required),
      email: this.fb.control<string>('', Validators.required),
      phone: this.fb.control<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      hobbies: this.hobbies
    })
  }

  protected addHobbyRow() {
    this.hobbies.push(this.createHobbyRow())
  }

  protected removeHobbyRow(i: number) {
    this.hobbies.removeAt(i)
    this.form.setControl("hobbies", this.hobbies)
  }

  private createHobbyRow(): FormGroup {
    return this.fb.group({
      hobby: this.fb.control<string>('')
    })
  }
  
  
  processForm() {
    const mem: Member =this.form.value
    console.info("Recevied form: ", mem)
  }
}
