const mongoose = require('mongoose');
const { ulid } = require('ulid');

const EventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        unique: true,
        required: true,
        index: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    date: {
        type: Date,
        required: true,
    },
    eventEndDate: {
        type: Date,
        required: true,
    },
    registrationStartDate: {
        type: Date,
        required: true,
    },
    registrationEndDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    pointsAwarded: {
        type: Number,
        required: true,
        min: 1,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    imageUrl: {
        type: String,
        default: '',
    },
    customRegistrationFields: [{
        fieldName: { type: String },
        fieldLabel: { type: String },
        fieldType: {
            type: String,
            enum: ['text','email','number','tel','textarea','select','checkbox','radio','date'],
        },
        required: { type: Boolean, default: false },
        options: [String],
        placeholder: String,
        validation: {
            min: Number,
            max: Number,
            minLength: Number,
            maxLength: Number,
            pattern: String,
        }
    }]
}, { timestamps: true });

/**
 * ✅ SAFE EVENT ID GENERATION
 * Runs before validation
 * No DB read
 * No race condition
 */
EventSchema.pre('validate', function (next) {
    if (!this.eventId) {
        this.eventId = `EVT_${ulid()}`;
    }
    next();
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
