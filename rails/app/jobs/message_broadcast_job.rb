class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast 'room_channel', message: render_message(message)
  end

  private
    def render_message(message)
      # ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
      ApplicationController.renderer.render :json => { message: { user_name: message.user_name, content: message.content, id: message.id.to_s  }}
    end
end
