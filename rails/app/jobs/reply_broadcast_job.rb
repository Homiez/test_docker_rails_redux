class ReplyBroadcastJob < ApplicationJob
  queue_as :default

  def perform(messages)
    ActionCable.server.broadcast 'room_channel', message: render_message(messages)
  end

  private
    def render_message(message)
      # ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
      ApplicationController.renderer.render json: { messages: message }
    end
end
