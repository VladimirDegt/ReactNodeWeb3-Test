const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');

const add = async (req, res) => {
    try {
        req.body.timestamp = new Date();
        req.body.createBy = req.user.userId;
        const meeting = new MeetingHistory(req.body);
        await meeting.save();
        res.status(200).json(meeting);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create Meeting' });
    }
}

const index = async (req, res) => {
    try {
        const query = { ...req.query, deleted: false };
        let meetings = await MeetingHistory.find(query)
            .populate('createBy')
            .exec();
        res.status(200).json(meetings);
    } catch (err) {
        res.status(400).json({ error: 'Failed to get Meetings' });
    }
}

const view = async (req, res) => {
    try {
        let meeting = await MeetingHistory.findOne({ _id: req.params.id, deleted: false })
            .populate('createBy')
            .exec();
        if (!meeting) return res.status(404).json({ message: 'No data found.' });
        res.status(200).json(meeting);
    } catch (err) {
        res.status(400).json({ error: 'Failed to get Meeting' });
    }
}

const edit = async (req, res) => {
    try {
        let result = await MeetingHistory.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update Meeting' });
    }
}

const deleteData = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findByIdAndUpdate(req.params.id, { deleted: true });
        res.status(200).json({ message: 'done', meeting });
    } catch (err) {
        res.status(404).json({ message: 'error', err });
    }
}

const deleteMany = async (req, res) => {
    try {
        const meetings = await MeetingHistory.updateMany({ _id: { $in: req.body } }, { $set: { deleted: true } });
        res.status(200).json({ message: 'done', meetings });
    } catch (err) {
        res.status(404).json({ message: 'error', err });
    }
}

module.exports = { add, index, view, edit, deleteData, deleteMany }