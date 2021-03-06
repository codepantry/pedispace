Shifts = new Mongo.Collection('shifts');

Meteor.methods({
  shiftAdd: function(shift) {
    check(shift, {
      businessId: String,
      bikeId: String,
      radioId: String,
      shiftTypeId: String,
      totalMade: Number,
      ratePaid: Number,
      shiftRate: Number,
      startTime: Date,
      comments: String,
      userId: String
    });
    console.log(shift.startTime);
    console.log(new Date());
  	var shift = _.extend(shift, {
  		endTime: new Date(),
  		submitted: new Date()
  	})
    Shifts.insert(shift);
  }
});

validatePost = function (shift) {
  var errors = {};
  if (!shift.userId)
    errors.userId = "Please select yourself from the dropdown menu";
  if (!shift.bikeId)
    errors.bikeId =  "Please select your bike";
  if (!shift.shiftTypeId)
    errors.shiftType =  "Please select your shift type";
  if (!shift.startTime || !moment(shift.startTime).isValid())
    errors.startTime =  "Please enter a valid date";
  if (shift.startTime > moment())
    errors.startTime = "Your date is after the current time"
  if (isNaN(shift.totalMade) || (shift.totalMade > 3000) || !shift.totalMade || shift.totalMade < shift.ratePaid)
    errors.totalMade = "You did not enter a valid dollar amount"
  if (isNaN(shift.ratePaid) || !shift.ratePaid)
    errors.ratePaid = "You did not enter a valid dollar amount"
  if (isNaN(shift.shiftRate) || !shift.shiftRate)
    errors.shiftRate = "You did not enter a valid dollar amount"
  return errors;
}
