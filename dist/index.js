"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    Id;
    name;
    email;
    password;
    phone;
    age;
    notebooks;
    constructor(Id, name, email, password, phone, age) {
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60.");
        }
        this.Id = Id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
        this.notebooks = [];
    }
    displayInfo() {
        console.log(`User: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
}
class Admin extends User {
    manageNotes(notebook, noteId) {
        notebook.removeNote(noteId);
        console.log(`Admin ${this.name} removed note ${noteId}`);
    }
}
class Note {
    Id;
    title;
    content;
    userId;
    author;
    constructor(Id, title, content, author) {
        this.Id = Id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = author.Id;
    }
    preview() {
        return this.content.length > 20
            ? this.content.substring(0, 20) + "..."
            : this.content;
    }
}
class NoteBook {
    notes = [];
    nextId = 1;
    addNote(title, content, author) {
        this.notes.push(new Note(this.nextId++, title, content, author));
    }
    removeNote(noteId) {
        this.notes = this.notes.filter(note => note.Id !== noteId);
    }
    getNotes() {
        return [...this.notes];
    }
}
class DataStorage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    getAllItems() {
        return [...this.items];
    }
}
const user = new User(1, "Sayed", "sayed@mail.com", "1234", "0100000000", 25);
const admin = new Admin(2, "Admin", "admin@mail.com", "admin123", "0111111111", 30);
const book = new NoteBook();
user.addNotebook(book);
book.addNote("Shopping", "Buy milk, eggs and bread from the store", user);
user.displayInfo();
const firstNote = book.getNotes()[0];
console.log(firstNote?.preview() ?? "No notes available");
admin.manageNotes(book, 1);
const storage = new DataStorage();
storage.addItem("hello");
console.log(storage.getAllItems());
//# sourceMappingURL=index.js.map