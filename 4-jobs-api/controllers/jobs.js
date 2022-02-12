const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort(
    "creaatedAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.OK).json({ job });
};
const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobsId },
    body: { company, position },
  } = req;
  if (!company || !position) {
    throw new BadRequestError("Company or Position fileds is empety");
  }

  const job = await Job.findOneAndUpdate(
    {
      _id: jobsId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`Error there's no job with ${jobsId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndRemove({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`Error there's no job with ${jobId}`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
