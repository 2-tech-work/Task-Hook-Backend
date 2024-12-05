import Group from "../models/group.js";
import { v4 as uuidv4 } from "uuid";

export const getGroups = async (req, res) => {
  const groups = await Group.find();
  res.send(groups);
};

export const createGroup = async (req, res) => {
  const { name, tasks } = req.body;
  try {
    const groupId = `GRP-${uuidv4().slice(0, 8)}`;

    const newGroup = await Group.create({
      groupId,
      name,
      tasks,
    });
    res
      .status(200)
      .json({ message: "Group Created Successfully", group: newGroup });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eachGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findOne({ groupId: id });
    if (!group) {
      return res.status(400).json({ message: "Group Not Found" });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const group = await Group.findOneAndUpdate(
      { groupId: id },
      {
        name,
        description,
      },
      { new: true }
    );
    if (!group) {
      return res.status(400).json({ message: "Group not found" });
    }
    res.status(200).json({ message: "Group Updated Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findOneAndDelete({ groupId: id });
    if (!group) {
      return res.status(400).json({ message: "Group not found" });
    }
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
