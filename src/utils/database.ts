import mongoose from 'mongoose';

import Server from '../models/server';

export async function connectMongoDB() {
  await mongoose.connect(`${process.env.MONGODB_URL}Bot`, {
    autoIndex: false,
  });
}

export async function getServerData(serverId: string) {
  let serverData = await Server.findOne({
    serverId,
  });

  if (!serverData) {
    serverData = new Server({
      serverId,
    });
    await serverData.save();
  }

  return serverData;
}
