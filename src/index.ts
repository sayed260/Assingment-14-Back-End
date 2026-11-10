
class User {
    public Id: number;
    public name: string;
    public email: string;
    private password: string;
    public phone: string;
    protected age: number;
    public notebooks: NoteBook[];

    constructor(Id: number, name: string, email: string, password: string, phone: string, age: number) {
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

    public displayInfo(): void {
        console.log(`User: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
    }

    public addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }
}

class Admin extends User {
    public manageNotes(notebook: NoteBook, noteId: number): void {
        notebook.removeNote(noteId);
        console.log(`Admin ${this.name} removed note ${noteId}`);
    }
}

class Note {
    public Id: number;
    public title: string;
    public content: string;
    public userId: number;
    public author: User;

    constructor(Id: number, title: string, content: string, author: User) {
        this.Id = Id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = author.Id;
    }

    public preview(): string {
        return this.content.length > 20
            ? this.content.substring(0, 20) + "..."
            : this.content;
    }
}

class NoteBook {
    private notes: Note[] = [];
    private nextId: number = 1;

    public addNote(title: string, content: string, author: User): void {
        this.notes.push(new Note(this.nextId++, title, content, author));
    }

    public removeNote(noteId: number): void {
        this.notes = this.notes.filter(note => note.Id !== noteId);
    }

    public getNotes(): Note[] {
        return [...this.notes];
    }
}

class DataStorage<T> {
    private items: T[] = [];

    public addItem(item: T): void {
        this.items.push(item);
    }

    public removeItem(item: T): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    public getAllItems(): T[] {
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

const storage = new DataStorage<string>();
storage.addItem("hello");
console.log(storage.getAllItems());