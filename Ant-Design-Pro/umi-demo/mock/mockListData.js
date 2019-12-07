export default {
  'get /api/list': function(req, res) {
    res.json({
      listData: [1, 2, 3, 4],
      maxNum: 4,
    });
  },
};
