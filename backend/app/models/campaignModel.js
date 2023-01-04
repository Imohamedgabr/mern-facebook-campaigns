module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        type: String,
        objective: String,
        spendLimit : String,
        adsets : String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Campaign = mongoose.model("Campaign", schema);
    return Campaign;
  };
  