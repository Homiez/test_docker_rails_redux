# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def all
     ReplyBroadcastJob.perform_later Message.all.to_json
  end

  def speak(data)
    Message.create! user_name: data['user_name'], content: data['message']
  end
end
