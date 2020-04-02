class ContactsController < ApplicationController
    before_action :set_contact, only: [:show, :edit, :update, :destroy]
    before_action :authenticate_user!
    
    def index
        contacts = Contact.all
        render json: contacts
    end
    
    def show
        contact = Contacts.find(params[:id])
        render json: contact
    end

    def create
      contact = Contact.create(appt_params)
        if appt.valid?
            render json: contact
        else
             render json: contact.errors, status: :unprocessable_entity
        end
    end
    
    def destroy
        contact = Contact.find(params[:id])
        if contact.destroy
            render json: contact
        else
            render json: contact.errors
        end
    end
    
    def update
        contact = Contact.find(params[:id])
        contact.update(contact_params)
        if contact.valid?
            render json: contact
        else
            render json: contact.errors
        end
    end
    
    private
    def contact_params
        params.require(:appartment).permit(:name, :phone, :hours)
    end
end
