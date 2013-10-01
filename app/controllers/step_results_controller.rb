class StepResultsController < InheritedResources::Base
    respond_to :json

    def permitted_params
        params.permit(:step_result => [:time, :solve_id, :step_id])
    end
end
