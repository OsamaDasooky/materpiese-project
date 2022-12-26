@extends('layouts.master')

@section('title', ' shop Log in')

@section('content')

    @if (session()->has('email'))
        <div class="alert alert-danger text-center">
            {{ session()->get('email') }}
        </div>
    @endif
    @if (session()->has('status'))
        <div class="alert alert-success text-center">
            {{ session()->get('status') }}
        </div>
    @endif
    <div class="container">
        <form class="custom-form volunteer-form my-5 mb-lg-0  pb-0" action="users/authenticate" method="post" role="form">
            @csrf
            <h3 class="mb-5 text-center">Log In to Your Shop Account</h3>

            <div class="row w-50 mx-auto mb-3 pt-2">

                <div class=" col-12">
                    <input type="email" name="email" id="email" value="{{ old('email') }}" class="form-control"
                        placeholder="Jackdoe@gmail.com">
                </div>

                @error('email')
                    <p class="text-danger small" style="margin-top: -1.5rem">{{ $message }}</p>
                @enderror

                <div class=" col-12">
                    <input type="password" name="password" id="password" class="form-control" placeholder="Password"
                        value="{{ old('password') }}">
                </div>


                @error('password')
                    <p class="text-danger small" style="margin-top: -1.5rem">{{ $message }}</p>
                @enderror

                <div class="d-flex justify-content-between align-items-center pt-0 pb-1">
                    <div>
                        <input type="checkbox" value="true" id="flexCheckChecked" checked name="remember" />
                        <label class="form-check-label small" for="flexCheckChecked">Remember me</label>
                    </div>
                    <a href="/forgot-password" class="text-decoration-underline small">Forgot Your Password?</a>
                </div>





                <button type="submit" class="form-control mx-auto">Log In</button>
            </div>
        </form>
    </div>


@endsection
