class UserSerializer < ActiveModel::Serializer
  embed :ids
  attributes :id, :email
end
