var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: { type: String, required: true, max: 100 },
        family_name: { type: String, required: true, max: 100 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
    }
);

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

// Virtual for author's lifespan
AuthorSchema
    .virtual('lifespan')
    .get(function () {
        return ((moment(this.date_of_death).format('YYYY')) - (moment(this.date_of_birth).format('YYYY')));
    });

// Virtual for formatted date of birth
AuthorSchema
    .virtual('dateOfBirth')
    .get(function () {
        // return (this.date_of_birth.getYear()).toString();
        if (this.date_of_birth) {
            return (moment(this.date_of_birth).format('MMMM Do, YYYY')).toString();
        } else {
            return "n.d.";
        }
    });

// Virtual for formatted date of death
AuthorSchema
    .virtual('dateOfDeath')
    .get(function () {
        // return (this.date_of_birth.getYear()).toString();
        if (this.date_of_death) {
            return moment(this.date_of_death).format('MMMM Do, YYYY');
        } else {
            return "n.d.";
        }
    });

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
