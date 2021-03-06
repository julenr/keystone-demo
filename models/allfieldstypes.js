var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Everything = new keystone.List('All Fields types', {
	label: 'All Fields types',
	singular: 'Thing',
	plural: 'Things',
	path: 'things',
	autokey: {from: 'name', path: 'autokey'}
});

Everything.add(
	'Simple Fields', {
		name: {type: String},
		requiredString: {type: String, required: true, initial: true, note: 'This field is required.'},
		defaultString: {type: String, default: 'Default Value'},
		textarea: {type: Types.Textarea, initial: true},
		key: {type: Types.Key},
		email: {type: Types.Email},
		url: {type: Types.Url},
		number: {type: Types.Number},
		money: {type: Types.Money},
		checkbox: {type: Boolean, initial: true},
		date: {type: Types.Date},
		dateTime: {type: Date},
		html: {type: Types.Html}
	}, 'Complex Fields', {
		select: {type: Types.Select, options: 'first, second, third', initial: true},
		indentedCheckbox: {type: Boolean, initial: true, indent: true, note: 'This checkbox is indented'},
		customSelect: {
			type: Types.Select, options: [
				{label: 'Option 1', value: 'one'},
				{label: 'Option 2', value: 'two'},
				{label: 'Option 3', value: 'three'}
			]
		},
		numericSelect: {
			type: Types.Select, numeric: true, options: [
				{label: 'Number 1', value: 1},
				{label: 'Number 2', value: 2},
				{label: 'Number 3', value: 3}
			]
		},
		splitName: {type: Types.Name, initial: true},
		password: {type: Types.Password, initial: true},
		location: {type: Types.Location},
		markdown: {type: Types.Markdown},
		wysiwygHtml: {type: Types.Html, wysiwyg: true}
	}, 'Dependent Fields', {
		otherSelect: {
			type: Types.Select, options: [
				{label: 'Pre-defined Value', value: 'predefined'},
				{label: 'Other Value', value: 'other'}
			]
		},
		otherValue: {type: String, dependsOn: {otherSelect: 'other'}}
	}, 'Uneditable Fields', {
		uneditableString: {type: String, noedit: true, default: "Not editable"},
		uneditableCheckbox: {
			type: Boolean,
			noedit: true,
			default: true,
			note: 'Uneditable boolean notes are displayed next to the checkbox'
		},
		uneditableDate: {type: Types.Date, noedit: true, default: Date.now},
		uneditableSelect: {
			type: Types.Select,
			noedit: true,
			options: 'Barcelona, New York, London, Paris, Hong Kong',
			default: 'Barcelona'
		},
		uneditableLocation: {
			type: Types.Location,
			noedit: true,
			defaults: {
				street1: '283-285 Kent St',
				suburb: 'Barcelona',
				state: 'Cataluna',
				postcode: '2000',
				country: 'Spain'
			}
		}
	});

Everything.schema.virtual('otherSelectValue').get(function () {
	return (this.otherSelect == 'other') ? this.otherValue : this.otherSelect;
});

Everything.track = true;
Everything.register();
