db.createUser(
  {
      user: "root",
      pwd: "example",
      roles:[
          {
              role: "readWrite",
              db:   "local_library"
          }
      ]
  }
);

let error = false

let genres = []
let authors = []
let books = []
let bookinstances = []
  

function authorCreate(first_name, family_name, date_of_birth, date_of_death) {
    authordetail = {first_name:first_name , family_name: family_name ,date_of_birth: null, date_of_death: null}
    if (date_of_birth != false) authordetail.date_of_birth = date_of_birth;
    if (date_of_death != false) authordetail.date_of_death = date_of_death;
    authors.push(authordetail)
    res.push(db.authors.insert(authordetail))
}

function genreCreate(name) {
  genredetail = {name: name};
  genres.push(genredetail)
  res.push(db.genres.insert(genredetail))
}


function bookCreate(title, summary, isbn, author, genre) {
    bookdetail = { 
      title: title,
      summary: summary,
      author: author,
      isbn: isbn,
      genre: null
    }
    if (genre != false) bookdetail.genre = genre;   
    books.push(bookdetail);
    res.push(db.books.insert(bookdetail))
}

function bookInstanceCreate(book, imprint, due_back, status) {
  bookinstancedetail = { 
    book: book,
    imprint: imprint,
    due_back: null,
    status: null
  }    
  if (due_back != false) bookinstancedetail.due_back = due_back
  if (status != false) bookinstancedetail.status = status
    bookinstances.push(bookinstancedetail);
    res.push(db.bookinstances.insert(bookinstancedetail))
}

  

let res = [
  db.books.drop(),
  db.authors.drop(),
  db.bookinstances.drop(),
  db.genres.drop(),
  
  db.books.createIndex({ title: 1 },{ unique: true }),
  db.books.createIndex({ summary: 1 }),
  db.books.createIndex({ author: 1 }),
  db.books.createIndex({ isbn: 1 }),
  db.books.createIndex({ genre: 1 }),                            
  
  db.authors.createIndex({first_name:1},{name:"first_name"}),
  db.authors.createIndex({family_name:1},{name:"family_name"}),
  db.authors.createIndex({date_of_birth:1},{name:"date_of_birth"}),
  db.authors.createIndex({date_of_death:1},{name:"date_of_death"}),

  db.bookinstances.createIndex({book: 1}),
  db.bookinstances.createIndex({imprint: 1}),
  db.bookinstances.createIndex({due_back: 1}),
  db.bookinstances.createIndex({status: 1}),

  db.genres.createIndex({name: 1}),
]

authorCreate('Patrick', 'Rothfuss', new Date('1973-06-06'), false);
authorCreate('Ben', 'Bova', new Date('1932-11-8'), false);
authorCreate('Isaac', 'Asimov', new Date('1920-01-02'), new Date('1992-04-06'));
authorCreate('Bob', 'Billings', false, false);
authorCreate('Jim', 'Jones', new Date('1971-12-16'), false);

genreCreate("Fantasy");
genreCreate("Science Fiction");
genreCreate("French Poetry");

printjson(res);
res = [];

var myAuthorCursor = db.authors.find();
var authorsArray = myAuthorCursor.toArray();


var myGenreCursor = db.genres.find();
var genresArray = myGenreCursor.toArray();


bookCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', authorsArray[0]._id, [genresArray[0]._id,]);
bookCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', authorsArray[0]._id, [genresArray[0]._id,]);
bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authorsArray[0]._id, [genresArray[0]._id,]);
bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authorsArray[1]._id, [genresArray[1]._id,]);
bookCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', authorsArray[1]._id, [genresArray[1]._id,]);
bookCreate('Test Book 1', 'Summary of test book 1', 'ISBN111111', authorsArray[4]._id, [genresArray[0]._id,genresArray[1]._id]);
bookCreate('Test Book 2', 'Summary of test book 2', 'ISBN222222', authorsArray[4]._id, false)
 
printjson(res);
res = [];

var myBookCursor = db.books.find();
var booksArray = myBookCursor.toArray();

bookInstanceCreate(booksArray[0]._id, 'London Gollancz, 2014.', false, 'Available');
bookInstanceCreate(booksArray[1]._id, ' Gollancz, 2011.', '2020-06-06', 'Loaned');
bookInstanceCreate(booksArray[2]._id, ' Gollancz, 2015.', false, false);
bookInstanceCreate(booksArray[3]._id, 'New York Tom Doherty Associates, 2016.', false, 'Available');
bookInstanceCreate(booksArray[3]._id, 'New York Tom Doherty Associates, 2016.', false, 'Available');
bookInstanceCreate(booksArray[3]._id, 'New York Tom Doherty Associates, 2016.', false, 'Available');
bookInstanceCreate(booksArray[4]._id, 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available');
bookInstanceCreate(booksArray[4]._id, 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance');
bookInstanceCreate(booksArray[4]._id, 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned');
bookInstanceCreate(booksArray[0]._id, 'Imprint XXX2', false, false);
bookInstanceCreate(booksArray[1]._id, 'Imprint XXX3', false, false);

printjson(res)

if (error) {
  print('Error, exiting')
  quit(1)
}

