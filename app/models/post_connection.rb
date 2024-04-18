class PostConnection < ApplicationRecord
  belongs_to :post
  belongs_to :related_post, class_name: 'Post', foreign_key: 'related_post_id'
end
