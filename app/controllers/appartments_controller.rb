class AppartmentsController < ApplicationController
    before_action :set_appartment, only: [:show, :edit, :update, :destroy]
    before_action :authenticate_user!
    skip_before_action :verify_authenticity_token
    
    def index
        appartments = Appartment.all
        render json: appartments
    end
    
    def show
        appartment = Appartment.find(params[:id])
        render json: appartment
    end

    def create
      appartment = current_user.appartments.create(appt_params)
        if appartment.valid?
            render json: appartment
        else
             render json: appartment.errors, status: :unprocessable_entity
        end
    end
    
    def destroy
        appartment = current_user.appartments.find(params[:id])
        if appartment.destroy
            render json: appartment
        else
            render json: appartment.errors
        end
    end
    
    def update
        appartment = current_user.appartments.find(params[:id])
        appartment.update(appt_params)
        if appartment.valid?
            render json: appartment
        else
            render json: appartment.errors
        end
    end
    
    private
    def appt_params
        params.require(:appartment).permit(:street, :city, :postal, :state, :country, :price, :rooms, :image, :user_id)
    end
end
