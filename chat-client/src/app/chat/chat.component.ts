import {Component, OnDestroy, OnInit} from '@angular/core';
import {io} from 'socket.io-client';
import {AuthService} from "../login/auth.service";
import {MessageEvent} from "./message-event.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsersChangedEvent} from "./users-changed-event.model";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  socket = io(`http://localhost:3000?username=${this.authService.username}`);

  messages: MessageEvent[] = [];
  messageForm: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.socket.on('message', (message: MessageEvent) => {
      this.messages.push(message);
    });
    this.socket.on('users-changed', (event: UsersChangedEvent) => {
      this.openUserChangedSnackBar(event);
    });
  }

  sendMessage() {
    this.socket.emit('message', this.messageForm.value.message);
    this.messageForm.reset();
  }

  openUserChangedSnackBar(event: UsersChangedEvent) {
    console.log(event);
    this._snackBar.open(
      `${event.user.username} ${event.type} the chat.`,
      'Hide',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
    this.authService.logout();
  }
}
