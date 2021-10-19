window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('app_req_submit_btn').onclick = submitApplicationRequirementForm;
 });

 const submitApplicationRequirementForm = async () => {

    let requirements = {};
    let i = 1;

    while (i <= 14){
        if ($(`#benchmark${i}`).val() != "")
        switch(i){
            case 1:
                console.log($(`benchmark${i}`).val())
        }

        i++;
    }
 }
 