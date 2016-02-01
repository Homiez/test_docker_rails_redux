class ApiController < ApplicationController

  def loadInfo
    render :json => { name: "hi" }
  end

  def loadAuth
   render :json => { name: "hi" }
  end

  def res
    logger.info params
    logger.info "~~~~~OMFMFMFMFMF"
    render :json => { name: params[:name] }
  end

  def logout
   render :json => { name: "logout ok" }
  end
end
