class ApiController < ApplicationController

  def loadInfo
    render :json => { name: "hi" }
  end

  def loadAuth
   render :json => { name: "hi" }
  end

  def res
    render :json => { name: params[:name] }
  end
end
