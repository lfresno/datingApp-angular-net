import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

//para intentar evitar que el usuario se vaya de la pantalla de editar perfil si no ha guardado los cambios
export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {

  if(component.myForm.dirty){
    return confirm('Are you sure you want to continue? Any unsaved changes will be lost')
  }


  return true;
};
