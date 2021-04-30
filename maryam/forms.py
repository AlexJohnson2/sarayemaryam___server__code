from django import forms


class ImageForm(forms.Form):
	image = forms.FileField(help_text="عکس را آپلود کنید")
    