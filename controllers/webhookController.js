const asyncHandler = require('../middleware/asyncHandler');

const handleWebhook = asyncHandler(async (req, res) => {
  const { requestId, status } = req.body;

  // Update the request status in the database
  await Request.findOneAndUpdate({ requestId }, { status });

  res.status(200).json({ message: 'Webhook received' });
});

module.exports = { handleWebhook };
