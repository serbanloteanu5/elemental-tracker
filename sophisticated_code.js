/* 
Filename: sophisticated_code.js
Description: This code demonstrates a complex implementation of a media library management system using JavaScript. It includes features like adding, deleting, and searching for media items, as well as managing borrowings and returns.

Note: This is a simplified version for demonstration purposes, and would require additional error handling, data persistence, and a user interface in a real-world application.
*/

// Media class representing a generic media item
class Media {
  constructor(title, author, year, type) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.type = type;
    this.borrower = null;
    this.borrowedDate = null;
  }

  getInfo() {
    return `${this.title} by ${this.author}, ${this.year}`;
  }

  borrow(user) {
    if (this.borrower) {
      console.log(`${this.title} is already borrowed by ${this.borrower}.`);
      return;
    }
    this.borrower = user;
    this.borrowedDate = new Date();
    console.log(`${this.title} is now borrowed by ${this.borrower}.`);
  }

  returnMedia() {
    if (!this.borrower) {
      console.log(`${this.title} is not currently borrowed.`);
      return;
    }
    const returnDate = new Date();
    const daysBorrowed = Math.round((returnDate - this.borrowedDate) / (1000 * 60 * 60 * 24));
    this.borrower = null;
    this.borrowedDate = null;
    console.log(`${this.title} returned by ${this.borrower} after ${daysBorrowed} days.`);
  }
}

// MediaLibrary class to manage the media items
class MediaLibrary {
  constructor() {
    this.mediaItems = [];
  }

  addMedia(media) {
    this.mediaItems.push(media);
    console.log(`${media.title} added to the library.`);
  }

  removeMedia(mediaTitle) {
    const index = this.mediaItems.findIndex(m => m.title === mediaTitle);
    if (index === -1) {
      console.log(`${mediaTitle} is not found in the library.`);
      return;
    }
    const removedMedia = this.mediaItems.splice(index, 1)[0];
    console.log(`${removedMedia.title} removed from the library.`);
  }

  searchMedia(searchTerm) {
    const foundMedia = this.mediaItems.filter(m =>
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(`${foundMedia.length} media items found for "${searchTerm}":`);
    foundMedia.forEach(media => console.log(media.getInfo()));
  }
}

// Create media library and populate with some media items
const library = new MediaLibrary();

const book1 = new Media('The Catcher in the Rye', 'J.D. Salinger', 1951, 'Book');
const book2 = new Media('To Kill a Mockingbird', 'Harper Lee', 1960, 'Book');
const movie1 = new Media('The Shawshank Redemption', 'Frank Darabont', 1994, 'Movie');
const album1 = new Media('Dark Side of the Moon', 'Pink Floyd', 1973, 'Album');

library.addMedia(book1);
library.addMedia(book2);
library.addMedia(movie1);
library.addMedia(album1);

// Demonstrate borrow and return functionality
book1.borrow('John');
book2.borrow('Emily');
book1.returnMedia();

// Search media library
library.searchMedia('kill');
library.searchMedia('book');

// Remove media item
library.removeMedia('Dark Side of the Moon');

// Output media items in the library
console.log('Media Library contents:');
library.mediaItems.forEach(media => console.log(media.getInfo()));

// End of code