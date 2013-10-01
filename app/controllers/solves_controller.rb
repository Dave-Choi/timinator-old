class SolvesController < InheritedResources::Base
    respond_to :json

    def permitted_params
        params.permit(:solve => [:scramble, :solve_method_id, :user_id])
    end
end
