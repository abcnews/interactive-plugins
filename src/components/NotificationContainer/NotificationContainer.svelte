<script lang="ts">
    export let layout = 'square';

</script>

<div class={`notification-container notification-container__${layout}`}>
    <svg width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Headphones" clip-path="url(#clip0_50_1018)">
        <path id="Ellipse 69" d="M34.5 25V18.3636C34.5 9.32625 27.3366 2 18.5 2C9.66344 2 2.5 9.32625 2.5 18.3636V25" stroke="black" stroke-width="4"/>
        <path id="Rectangle 98" d="M28.5 21.0774C28.5 19.6301 29.9897 18.662 31.3123 19.2498L32.1246 19.6108C33.5691 20.2528 34.5 21.6853 34.5 23.2661V28.7338C34.5 30.3145 33.5691 31.747 32.1246 32.389L31.3123 32.75C29.9897 33.3378 28.5 32.3697 28.5 30.9224V21.0774Z" stroke="black" stroke-width="4"/>
        <path id="Rectangle 99" d="M8.5 21.0774C8.5 19.6301 7.0103 18.662 5.68772 19.2498L4.87545 19.6108C3.43093 20.2528 2.5 21.6853 2.5 23.2661V28.7338C2.5 30.3145 3.43093 31.747 4.87545 32.389L5.68772 32.75C7.0103 33.3378 8.5 32.3697 8.5 30.9224V21.0774Z" stroke="black" stroke-width="4"/>
        </g>
        <defs>
        <clipPath id="clip0_50_1018">
        <rect width="37" height="35" fill="white"/>
        </clipPath>
        </defs>
        </svg>

        <p class="notification-container__text">This story is best experienced with sound on</p>
</div>

<style>
    .notification-container{
        border-radius: 1.5rem;
        padding:1.5rem;
        background:rgba(16, 49, 106, 0.10);
    }

    .notification-container__text{
        color: #000;
        text-align: center;
        font-family: ABCSerif;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: 125%;
    }
</style>