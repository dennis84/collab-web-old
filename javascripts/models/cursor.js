var Backbone = require('backbone')

module.exports = Backbone.Model.extend({
  member: null,

  setMember: function(member) {
    var model = this
    this.member = member
    this.set('name', member.get('name'))

    this.listenTo(this.member, 'change', function(member) {
      model.set('name', member.get('name'))
    })
  }
})
