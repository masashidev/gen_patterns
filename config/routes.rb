Rails.application.routes.draw do
  namespace :api do
    get 'posts/index'
    get 'posts/show'
    get 'posts/create'
    get 'posts/update'
    get 'posts/destroy'
  end
  
  get "up" => "rails/health#show", as: :rails_health_check

  resources :posts

end
