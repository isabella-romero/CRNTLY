// src/resolvers/index.ts
import bcrypt from 'bcryptjs';
import User from '../models/User';
import generateToken from '../utils/generateToken';
import { IUser } from '../models/User';

const resolvers = {
Query: {
    me: async (_: any, __: any, context: any) => {
    if (!context.user) throw new Error('Not authenticated');
    return await User.findById(context.user.id);
    },
},
Mutation: {
    register: async (_: any, { username, email, password }: IUser) => {
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    const token = generateToken(user.id);

    return { ...user.toObject(), token };
    },
    login: async (_: any, { email, password }: IUser) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = generateToken(user.id);
    return { ...user.toObject(), token };
    },
},
};

export default resolvers;
